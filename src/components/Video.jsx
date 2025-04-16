function Video({ src, poster }) {
    return (
      <div className="relative w-full bg-black rounded-md overflow-hidden">
        <video
          src={src}
          poster={poster}
          autoPlay
          controls
          playsInline
          className="sm:h-[68vh] sm:max-w-4xl h-64 w-full object-contain mx-auto"
        ></video>
      </div>
    )
  }

  export default Video
