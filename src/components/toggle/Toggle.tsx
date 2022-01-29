import './toggle.scss';

export default function Toggle(props: { onToggle: () => void }) {
    return (

        <label className="switch">
            <input type="checkbox" onClick={props.onToggle} />
            <span className="slider round"></span>
        </label>
    )
}