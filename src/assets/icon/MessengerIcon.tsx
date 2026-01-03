export default function MessengerIcon({ addClass }: { addClass?: string }) {
	return (
		<img
			className={`mr-2 h-6 w-6 cursor-pointer rounded-full object-cover ${addClass}`}
			src="Messenger_Icon_Primary_Blue.svg"
			alt="Messenger Icon"
		/>
	);
}
