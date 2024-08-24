"use client";
import { useFormContext } from "@/lib/context";
import { FileInput, type FileInputProps, Label } from "flowbite-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FaCloudUploadAlt, FaFileUpload } from "react-icons/fa";
import { Image } from "image-js";

export const FileInputWrapper = ({
	title: key,
	accept,
}: { title: string; accept: FileInputProps["accept"] }) => {
	const { dispatch, state, section, images } = useFormContext();

	const [lastProcessed, setLastProcessed] = useState<null | string | number>(
		images.current.findIndex((i) => {
			return i.name.startsWith(key);
		}),
	);
	const resultRef = useRef<HTMLDivElement>(null);
	const fileRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (!fileRef.current) return;
		console.log("loaded", images, key);
		if (fileRef.current.files?.length) {
			console.log("already set", key, fileRef.current.files?.length);
			return;
		}
		const thisImageIsSet = images.current.find((i) => i.name.startsWith(key));
		if (!thisImageIsSet) return;
		setLastProcessed(thisImageIsSet.name);
		console.log(thisImageIsSet, "found");
		const container = new DataTransfer();
		container.items.add(thisImageIsSet);
		fileRef.current.files = container.files;
		console.log(container.items, "setting");
		handleChange();
	}, [key, images]);

	const handleChange = useCallback(() => {
		{
			if (!fileRef.current?.files) return;

			const files = fileRef.current.files;
			if (files?.[0]) {
				const reader = new FileReader();
				reader.onload = (e) => {
					if (!e.target?.result) return;
					Image.load(e.target.result)
						.catch((error) => {
							console.error(error.message);
							alert("Invalid file");
						})
						.then((loaded) => {
							if (!loaded) return;
							if (!resultRef.current) return;
							let edit = loaded;

							console.log({ lastProcessed });
							if (lastProcessed == null) {
								if (loaded.width > 1000 || loaded.height > 1000) {
									edit = loaded.resize({
										width: 800,
										preserveAspectRatio: true,
									});
								}

								console.log(loaded.width, loaded.height);
								edit = edit.grey();
							}
							resultRef.current.innerHTML = "";
							resultRef.current.appendChild(edit.getCanvas());
							const blob = edit.toBlob();
							blob.then((blob) => {
								console.log(blob.type, key, blob.size);
								const filename = `${key}.png`;
								images.dispatch({
									type: "set",
									image: new File([blob], filename),
								});
								setLastProcessed(filename);
							});
						});
				};
				reader.readAsDataURL(files[0]);
			}
		}
	}, [key, images.dispatch, lastProcessed]);

	useEffect(() => {
		setLastProcessed(null);
		fileRef.current?.addEventListener("change", handleChange);

		return () => {
			fileRef.current?.removeEventListener("change", handleChange);
		};
	}, [handleChange]);

	return (
		<div className="flex w-full items-center justify-center text-gray-500 dark:text-gray-400 flex-wrap gap-y-2">
			<Label
				htmlFor={key}
				className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
			>
				<div className="flex flex-col items-center justify-center pb-6 pt-5">
					<FaCloudUploadAlt size={"4rem"} />
					<p className="mb-2 text-sm ">
						<span className="font-semibold">Click to upload</span> or drag and
						drop
					</p>
					<span>{accept}</span>
				</div>
				<FileInput id={key} className="hidden" ref={fileRef} accept={accept} />
			</Label>
			<div ref={resultRef} id="result" />
		</div>
	);
};
