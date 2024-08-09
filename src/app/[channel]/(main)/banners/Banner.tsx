"use client"

import React, { useState } from "react";

import { CenterBanner } from "./CenterBanner";
import { BottomBanner } from "./BottomBanner";
import { TopBanner } from "./TopBanner";

type TBanner = {
    banner: {
        headline: string;
        text: string;
        buttonText: string
        buttonLink: string
        height: string
        width: string
        maxWidth: string
        maxHeight: string
        type: string
        backgroundColor: string
        buttonBackgroundColor: string
    }
}

export const Banner = ({
    banner: {
        headline,
        text,
        buttonText: buttonText,
        buttonLink: buttonLink,
        width,
        maxWidth: maxWidth,
        height,
        maxHeight: maxHeight,
        type,
        backgroundColor: backgroundColor,
        buttonBackgroundColor: buttonBackgroundColor,
    }, }: TBanner) => {
    const [displayBanner, setDisplayBanner] = useState(true);
    const centeredBanner = (
        <CenterBanner
            headline={headline}
            text={text}
            buttonText={buttonText}
            buttonLink={buttonLink}
            width={width}
            maxWidth={maxWidth}
            height={height}
            maxHeight={maxHeight}
            backgroundColor={backgroundColor}
            buttonBackgroundColor={buttonBackgroundColor}
            closeButtonClicked={() => setDisplayBanner(false)}
        ></CenterBanner>
    );

    const bottomBanner = (
        <BottomBanner
            headline={headline}
            text={text}
            buttonText={buttonText}
            buttonLink={buttonLink}
            height={height}
            maxHeight={maxHeight}
            backgroundColor={backgroundColor}
            buttonBackgroundColor={buttonBackgroundColor}
            closeButtonClicked={() => setDisplayBanner(false)}
        ></BottomBanner>
    );

    const topBanner = (
        <TopBanner
            headline={headline}
            text={text}
            buttonText={buttonText}
            buttonLink={buttonLink}
            height={height}
            maxHeight={maxHeight}
            backgroundColor={backgroundColor}
            buttonBackgroundColor={buttonBackgroundColor}
            closeButtonClicked={() => setDisplayBanner(false)}
        ></TopBanner>
    );

    if (!displayBanner) {
        return null;
    }

    switch (type) {
        case "bottom":
            return bottomBanner;
        case "top":
            return topBanner;
        default:
            return centeredBanner;
    }
}
