export default function CurrencyImage(prop: { src: string }) {
    const fallbackImg = "assets/icons/question_circle_icon.png";

    return (
        <img src={`https://assets.trustwalletapp.com/blockchains/smartchain/assets/${prop.src}/logo.png`} onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping
            currentTarget.src=fallbackImg;
          }} />
    )
}