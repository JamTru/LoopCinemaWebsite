const YoutubeEmbed = ({embedID}) => {
  return(
    <div className="resizeIFrame">
      <div>
        <iframe width="688" height="387" src={`https://www.youtube.com/embed/${embedID}`} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
      </div>
    </div>
  );
}
export default YoutubeEmbed;
