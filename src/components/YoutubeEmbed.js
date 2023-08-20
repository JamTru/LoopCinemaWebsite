const YoutubeEmbed = ({embedID}) => {
  return(
    <div className="resizeIFrame">
      <iframe width="789" height="337" src={`https://www.youtube.com/embed/${embedID}`} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    </div>
  );
}
export default YoutubeEmbed;
