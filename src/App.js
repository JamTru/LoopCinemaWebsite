import logo from './movie.png';
import './App.css';

function App() {
  return (
    <div>
      <header className="webHeader">
        <h1 id="brandName">Loop Cinemas</h1>
        <img src={logo} alt="logo"></img>
      </header>
      <nav>
        <i>test</i>
      </nav>
      <main>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sodales tincidunt magna, nec hendrerit lectus congue et. Quisque nisi felis, lobortis ac mauris vel, pulvinar malesuada erat. Ut pharetra in nisl eget ornare. Pellentesque faucibus at nulla tristique mattis. Sed imperdiet dui ut nulla volutpat accumsan. Fusce luctus, lorem eu feugiat consectetur, tellus purus euismod erat, ut faucibus ligula neque id mi. Vestibulum dignissim nulla eget metus viverra consequat. Nullam ac metus vel ex consequat ullamcorper. Cras in metus diam. In maximus id odio vitae rhoncus. In sed cursus lectus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc elementum eget metus euismod accumsan.</p>
      </main>
      <footer>
        <p>something</p>
      </footer>
    </div>
  );
}

export default App;
