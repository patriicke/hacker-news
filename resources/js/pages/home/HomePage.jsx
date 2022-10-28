import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { signout } from "./../../redux/slices/userSlice";
import { api } from "./../../api";
import Logo from "./../../assets/logo.png";
import Up from "./../../assets/up.png";
import { calculateDate } from "../../hooks";
import Person from "./../../assets/person.png";
import { useRef } from "react";
import CommentComponent from "../../components/CommentComponent";
export const HomePage = () => {
    const dispatch = useDispatch();
    const [posts, setPosts] = useState([]);
    const [show, setShow] = useState(false);
    const [current, setCurrent] = useState(0);
    const [count, setCount] = useState(50);
    const [prevCount, setPrevCount] = useState(0);
    const showElement = useRef();
    const getPosts = async () => {
        try {
            const request = await api.get("/post");
            const response = request.data;
            setPosts(response);
        } catch (error) {
            console.log(error);
        }
    };
    const buttons = ["news", "comments"];
    useEffect(() => {
        getPosts();
    }, []);
    const hide = (id) => {
        setPosts(
            posts.filter((post) => {
                return post.id != id;
            })
        );
    };
    useEffect(() => {
        const clickEvent = (e) => {
            if (!showElement.current?.contains(e.target)) setShow(false);
        };
        document.addEventListener("mousedown", clickEvent);
        return () => document.removeEventListener("mousedown", clickEvent);
    }, [showElement]);
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [count, prevCount]);
    const isValidUrl = (urlString) => {
        var urlPattern = new RegExp(
            "^(https?:\\/\\/)?" + // validate protocol
                "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // validate domain name
                "((\\d{1,3}\\.){3}\\d{1,3}))" + // validate OR ip (v4) address
                "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // validate port and path
                "(\\?[;&a-z\\d%_.~+=-]*)?" + // validate query string
                "(\\#[-a-z\\d_]*)?$",
            "i"
        ); // validate fragment locator h-[calc(100vh_-_5rem)]
        return !!urlPattern.test(urlString);
    };
    return (
        <div className="w-4/5 m-auto h-screen min-h-screen">
            <div className="h-12 bg-orange-500 flex items-center justify-between p-2">
                <div className="flex gap-3 items-center">
                    <img
                        src={Logo}
                        className="w-10 border-2 border-white h-10"
                    />
                    <div className="flex gap-2">
                        <h1 className="font-bold">Hacker News</h1>
                        <div className="flex gap-2">
                            {buttons.map((data, index) => (
                                <div key={data} className="flex gap-2">
                                    <button
                                        className={`hover:text-gray-200 ${
                                            current == index && "text-white"
                                        } font-medium`}
                                        onClick={() => setCurrent(index)}
                                    >
                                        {data}
                                    </button>
                                    <span>{data != "comments" && "|"}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="relative">
                    <img
                        src={Person}
                        alt="person"
                        className="rounded-full cursor-pointer"
                        onClick={() => setShow((v) => !v)}
                    />
                    {show && (
                        <div
                            className="absolute right-0 bg-white h-[6em] w-[10em] flex top-[calc(100%_+_7px)] justify-center rounded-sm"
                            ref={showElement}
                        >
                            <button
                                onClick={() => dispatch(signout())}
                                className="bg-blue-500 text-white p-1 px-2 m-1 rounded-md h-8"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
            {current == 0 ? (
                <div
                    className="bg-yellow-100 bg-opacity-20 p-2 min-h-[calc(100vh_-_5rem)] 
                overscroll-auto flex flex-col gap-3"
                >
                    <table className="w-full">
                        <tbody className="w-full flex flex-col gap-2 ">
                            {posts
                                .sort((a, b) => {
                                    return b.time - a.time;
                                })
                                .slice(prevCount, count)
                                .map((post, index) => {
                                    return (
                                        <tr
                                            className="flex h-10  items-center gap-3 border-b-[1px] border-opacity-50 border-gray-600  text-[0.8em]"
                                            key={post.id}
                                        >
                                            <td className="font-bold min-w-3">
                                                {index + 1 + prevCount}.
                                            </td>
                                            <td className="w-5">
                                                <img
                                                    src={Up}
                                                    alt="up"
                                                    className="w-full cursor-pointer"
                                                />
                                            </td>
                                            <td className="flex flex-col ">
                                                <div className="flex gap-1">
                                                    <a
                                                        href={
                                                            isValidUrl(post.url)
                                                                ? post.url
                                                                : `
                                                        https://news.ycombinator.com/from?site=${post.id}
                                                        `
                                                        }
                                                        className="font-semibold text-gray-700"
                                                    >
                                                        {post.title}
                                                    </a>
                                                    {isValidUrl(post.url) ? (
                                                        <a href={post.url}>
                                                            {
                                                                new URL(
                                                                    post.url
                                                                ).hostname
                                                            }
                                                        </a>
                                                    ) : null}
                                                </div>
                                                <div className="flex gap-[6px]">
                                                    <span>
                                                        {post.score} points
                                                    </span>
                                                    <a
                                                        href={`https://news.ycombinator.com/user?id=${post.by}`}
                                                    >
                                                        by {post.by}
                                                    </a>
                                                    <a>
                                                        {calculateDate(
                                                            post.time
                                                        )}{" "}
                                                        ago
                                                    </a>
                                                    <span
                                                        className="cursor-pointer"
                                                        onClick={() =>
                                                            hide(post.id)
                                                        }
                                                    >
                                                        | hide |
                                                    </span>
                                                    <span>
                                                        {post?.kids?.length}{" "}
                                                        comments{" "}
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                    <div className="flex">
                        <button
                            className="inline-flex items-center py-2 px-4 mr-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            disabled={count <= 50}
                            onClick={() => {
                                setCount((cu) => cu - 50);
                                setPrevCount((cu) => cu - 50);
                            }}
                        >
                            <svg
                                aria-hidden="true"
                                className="mr-2 w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                            Previous
                        </button>
                        <button
                            className="inline-flex items-center py-2 px-4 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            disabled={count >= 500}
                            onClick={() => {
                                setCount((cu) => cu + 50);
                                setPrevCount((cu) => cu + 50);
                            }}
                        >
                            Next
                            <svg
                                aria-hidden="true"
                                className="ml-2 w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                        </button>
                    </div>
                    <div className="border-t-2 border-orange-500 h-[10em] w-full p-2 flex items-center justify-center flex-col">
                        <h1>Hacker News Clone </h1>
                        <a
                            href="https://github.com/patriicke/hacker-news-assessment"
                            className="text-blue-500"
                        >
                            @patriicke
                        </a>
                    </div>
                </div>
            ) : (
                <CommentComponent />
            )}
        </div>
    );
};
