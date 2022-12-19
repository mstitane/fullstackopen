import Part from "./Part";
const Content = (props) => {
    return (
        <div>
            {props.parts.map((it, index) =>
                <Part key={it.id} name={it.name} exercice={it.exercises}/>
            )}
        </div>
    )
}
export default Content