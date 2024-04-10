import MainPage from './components/MainPage/MainPage';

function App() {


    return (
        <div>
            <MainPage endpoint='https://www.reddit.com/r/spaceengineers.json'></MainPage>
        </div>
    );
}

export default App;
