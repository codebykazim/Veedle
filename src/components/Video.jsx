function Video({ src, poster }) {
  return (
    <div className="relative w-full bg-gray-300 rounded-md overflow-hidden">
      <video
        src={src}
        poster={poster}
        autoPlay
        controls
        playsInline
        className="w-full aspect-video object-contain mx-auto"
      ></video>
    </div>
  );
}

export default Video;
