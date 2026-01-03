export default function FacebookIcon({ addClass }: { addClass?: string }) {
	return (
		<img
			className={`mr-2 h-6 w-6 cursor-pointer rounded-full object-cover ${addClass}`}
			src="facebook.svg"
			alt="facebookIcon"
		/>
	);
}
