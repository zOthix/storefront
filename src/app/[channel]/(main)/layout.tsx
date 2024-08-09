import { type ReactNode } from "react";
import { Banner } from "./banners/Banner";
import { Footer } from "@/ui/components/Footer";
import { Header } from "@/ui/components/Header";

export const metadata = {
	title: "Saleor Storefront example",
	description: "Starter pack for building performant e-commerce experiences with Saleor.",
};

const banner = {
	headline: "Announcement banner headline",
	text: "Announcement banner text",
	buttonText: "Button",
	buttonLink: "Button link",
	height: "300px",
	width: "500px",
	maxWidth: "500px",
	maxHeight: "300px",
	type: "center",
	backgroundColor: "red",
	buttonBackgroundColor: "white",
}

// const tBanner = {
// 	headline: "Announcement banner headline",
// 	text: "Announcement banner text",
// 	buttonText: "Button",
// 	buttonLink: "Button link",
// 	height: "200px",
// 	width: "500px",
// 	maxWidth: "500px",
// 	maxHeight: "200px",
// 	type: "top",
// 	backgroundColor: "red",
// 	buttonBackgroundColor: "white",
// }

// const bBanner = {
// 	headline: "Announcement banner headline",
// 	text: "Announcement banner text",
// 	buttonText: "Button",
// 	buttonLink: "Button link",
// 	height: "200px",
// 	width: "500px",
// 	maxWidth: "500px",
// 	maxHeight: "200px",
// 	type: "bottom",
// 	backgroundColor: "red",
// 	buttonBackgroundColor: "white",
// }

export default function RootLayout(props: { children: ReactNode; params: { channel: string } }) {
	return (
		<>
			<Banner banner={banner} />
			<Header channel={props.params.channel} />
			<div className="flex min-h-[calc(100dvh-64px)] flex-col">
				<main className="flex-1">{props.children}</main>
				<Footer channel={props.params.channel} />
			</div>
		</>
	);
}
