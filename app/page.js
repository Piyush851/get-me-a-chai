import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex flex-col justify-center text-white items-center h-[44vh] gap-4 px-5 text-center">
        <div className="font-bold flex gap-2 justify-center items-center text-5xl md:text-6xl">
          Buy Me a Chai
          <span>

            <img className="invertImg w-12 md:w-20" src="/tea.gif" alt="tea" />
          </span>
        </div>
        <p className="mb-2 text-sm md:text-base">
          A crowdfunding platform for creators. Get funded by your fans and followers.
        </p>
        <div className="flex gap-4 my-4">
          <button type="button" className="cursor-pointer text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-xl text-sm px-4 py-2.5 text-center leading-5">
            Start Now
          </button>
          <button type="button" className="cursor-pointer text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-xl text-sm px-4 py-2.5 text-center leading-5">
            Read More
          </button>
        </div>
      </div>

      <div className="bg-white h-1 opacity-10 my-5"></div>

      <div className="text-white mt-5 container mx-auto py-16 px-4">
        <h1 className="text-2xl font-bold text-center mb-9">Your fans can buy you a chai</h1>

        <div className="flex flex-col md:flex-row justify-around gap-10 md:gap-5">

          <div className="item space-y-3 flex flex-col items-center justify-center">
            <Image className="bg-slate-400 rounded-full p-2" width={88} height={88} src="/man.gif" alt="man" unoptimized />
            <p className="font-bold">Fans want to help</p>
            <p className="text-center max-w-xs">Your fans are available to support you.</p>
          </div>

          <div className="item space-y-3 flex flex-col items-center justify-center">
            <Image className="bg-slate-400 rounded-full p-2" width={88} height={88} src="/coin.gif" alt="coin" unoptimized />
            <p className="font-bold">Fans want to contribute</p>
            <p className="text-center max-w-xs">Your fans are willing to contribute financially.</p>
          </div>

          <div className="item space-y-3 flex flex-col items-center justify-center">
            <Image className="bg-slate-400 rounded-full p-2" width={88} height={88} src="/group.gif" alt="group" unoptimized />
            <p className="font-bold">Fans want to collaborate</p>
            <p className="text-center max-w-xs">Your fans are ready to collaborate with you.</p>
          </div>

        </div>
      </div>

      <div className="bg-white h-1 opacity-10 my-5"></div>

      <div className="text-white mt-5 container mx-auto py-16 flex flex-col items-center justify-center px-4">
        <h1 className="text-2xl font-bold text-center mb-9">Learn more about us</h1>

        <div className="w-full max-w-[560px] aspect-video">
          <iframe
            className="w-full h-full rounded-lg shadow-lg"
            src="https://www.youtube.com/embed/QtaorVNAwbI?si=yr4Wc8q6aAL4AGrY"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </>
  );
}