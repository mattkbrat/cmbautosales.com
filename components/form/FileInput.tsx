"use client";
import { useFormContext } from "@/lib/context";
import { FileInput, type FileInputProps, Label } from "flowbite-react";
import { Image } from "image-js";
import { useCallback, useState, useEffect, useRef } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";

export const FileInputWrapper = ({
	title: key,
	accept,
}: { title: string; accept: FileInputProps["accept"] }) => {
	const { images } = useFormContext();
	const [state, setState] = useState<
		"idle" | "submitting" | "rendering" | "rendered" | "hidden" | "failed"
	>("idle");

	const [lastProcessed, setLastProcessed] = useState<null | string | number>(
		images.current.findIndex((i) => {
			return i.name.startsWith(key);
		}),
	);
	const resultRef = useRef<HTMLDivElement>(null);
	const fileRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (!fileRef.current) return;
		if (fileRef.current.files?.length) {
			return;
		}
		const thisImageIsSet = images.current.find((i) => i.name.startsWith(key));
		if (!thisImageIsSet) return;
		setLastProcessed(thisImageIsSet.name);
		const container = new DataTransfer();
		container.items.add(thisImageIsSet);
		fileRef.current.files = container.files;
		handleChange();
	}, [key, images]);

	const handleChange = useCallback(() => {
		{
			setState("idle");
			if (!fileRef.current?.files) return;

			const files = fileRef.current.files;
			if (files?.[0]) {
				setState("submitting");
				const reader = new FileReader();
				reader.onload = (e) => {
					if (!e.target?.result) return;
					setState("rendering");
					Image.load(e.target.result)
						.catch((error) => {
							console.error(error.message);
							alert("Invalid file");
							setState("failed");
						})
						.then((loaded) => {
							if (!loaded) return;
							if (!resultRef.current) return;
							let edit = loaded;

							if (lastProcessed == null) {
								if (loaded.width > 1000 || loaded.height > 1000) {
									edit = loaded.resize({
										width: 800,
										preserveAspectRatio: true,
									});
								}

								edit = edit.grey();
							}
							resultRef.current.innerHTML = "";
							resultRef.current.appendChild(edit.getCanvas());
							const blob = edit.toBlob();
							blob.then((blob) => {
								const filename = `${key}.png`;
								images.dispatch({
									type: "set",
									image: new File([blob], filename),
								});
								setLastProcessed(filename);
								setState("rendered");
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
		<div className="flex w-full items-center justify-center text-gray-500 dark:text-gray-400 gap-y-2 flex-col sm:flex-row">
			<Label
				htmlFor={key}
				className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
			>
				<div className="flex flex-col items-center justify-center pb-6 pt-5">
					<FaCloudUploadAlt size={"4rem"} />
					<p className="mb-2 text-sm ">
						<span className="font-semibold">Click to upload</span>
						<span> or drag and drop</span>
					</p>
					<span>{accept}</span>
				</div>
				<FileInput id={key} className="hidden" ref={fileRef} accept={accept} />
			</Label>
			{state !== "rendered" && state !== "idle" && <span>{state}</span>}
			<div ref={resultRef} id="result" />
		</div>
	);
};
