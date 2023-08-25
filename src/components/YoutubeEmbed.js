const YoutubeEmbed = ({embedID}) => {
  return(
    <div className="resizeIFrame">
      <iframe width="789" height="337" src={`https://www.youtube.com/embed/${embedID}`} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
    </div>
  );
}
export default YoutubeEmbed;
