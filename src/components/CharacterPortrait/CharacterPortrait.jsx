import "./CharacterPortrait.css"
import GlareHover from "../GlareHover/GlareHover"

export default function CharacterPortrait({ imgPersonagem }) {
    return (
        <div>
            <GlareHover
                glareColor="#ffffff"
                glareOpacity={0.3}
                glareAngle={-30}
                glareSize={300}
                transitionDuration={800}
                playOnce={true}
                background="transparent"
                width="fit-content"
                height="fit-content"
                borderColor="transparent"
                borderRadius="0"
                className="character-portrait"
                >
                    <img src={imgPersonagem} />
                </GlareHover>
        </div>
    )
}