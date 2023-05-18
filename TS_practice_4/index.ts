// An enumeration called TypesOfMedia, which includes the lowercase types video, audio
enum TypesOfMedia { 
	Video = "video", 
	Audio = "audio"
}
// An enumeration called FormatsOfMedia, which includes the string video formats: .mp4, .mov, .mkv, .flv, .webM
enum FormatsOfMedia { 
	MP4 = ".mp4", 
	MOV = ".mov",
	MKV = ".mkv",
	FLV = ".flv",
	WEBM = ".webM",
}
// A description of the interface in which:
// name - string
// type - one of the above
// format - one of the above
// subtitles - optional field of the string type
// marks - optional field of unknown type

interface MediaProps {
	name: string;
	type: TypesOfMedia;
	format: FormatsOfMedia;
	subtitles?: string;
	marks?: unknown;
}

function playMedia(
	{ name, type, format, subtitles, marks }: MediaProps = {
		name: "example",
		type: TypesOfMedia.Video,
		format: FormatsOfMedia.MP4,
	}
): string {
	let marksLog: string;

	if (Array.isArray(marks)) {
		marksLog = marks.join(" ");
	} else if (typeof marks === "string") {
		marksLog = marks;
	} else {
		marksLog = "Unsupported type of marks";
	}
    // Create a functionality that if marks is an array, then "stack" all the elements in one line and place them in marksLog
    // If it is a string, just put it in marksLog
    // If something else, then marksLog = "Unsupported type of marks"
    // Don't allow any! 

	console.log(`Media ${name}${format} is ${type}
    Marks: ${marksLog}
    Subtitles: ${subtitles ?? "none"}`);

	return "Media started";
}

playMedia({
	name: "WoW",
	format: FormatsOfMedia.MOV,
	type: TypesOfMedia.Video,
	subtitles: "hmhmhm hmhmhm doh",
	marks: ["4:30", "5:40"],
});
