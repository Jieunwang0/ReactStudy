import "./App.css";
import Container from "./Container";
import MyFooter from "./MyFooter";
import MyHeader from "./MyHeader";
import Counter from "./Counter";
function App() {
    const CounterProps = {
        a: 5,
        b: 5,
        c: 4,
        d: 5,
        e: 5,
    };

    return (
        <Container>
            <div>
                <MyHeader />
                <Counter {...CounterProps} />
                <MyFooter />
            </div>
        </Container>
    );
}

export default App;
