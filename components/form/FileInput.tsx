"use client";
import { useFormStore } from "@/lib/context/form/form-store";
import { Image } from "image-js";
import { useCallback, useState, useEffect, useRef } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";

export const FileInputWrapper = ({
	title: key,
	accept,
}: { title: string; accept: string}) => {
	const { images, setImages } = useFormStore();
	const resultRef = useRef<HTMLDivElement>(null);
	const fileRef = useRef<HTMLInputElement>(null);
	const [state, setState] = useState<
		"idle" | "submitting" | "rendering" | "rendered" | "hidden" | "failed"
	>("idle");

	const [lastProcessed, setLastProcessed] = useState<null | string | number>(
		images.findIndex((i) => {
			return i.key === key;
		}),
	);

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
                setImages(
                  new File([blob], filename),
                  key
                )
								setLastProcessed(filename);
								setState("rendered");
							});
						});
				};
				reader.readAsDataURL(files[0]);
			}
		}
	}, [key, images, lastProcessed]);

		useEffect(() => {
		if (!fileRef.current) return;
		if (fileRef.current.files?.length) {
			return;
		}
		const thisImageIsSet = images.find((i) => i.key === key);
		if (!thisImageIsSet) return;
		setLastProcessed(key);
		const container = new DataTransfer();
		container.items.add(thisImageIsSet.file);
		fileRef.current.files = container.files;
		handleChange();
	}, [key, handleChange, images]);

	useEffect(() => {
		setLastProcessed(null);
		const changed = fileRef.current;
		fileRef.current?.addEventListener("change", handleChange);

		return () => {
			changed?.removeEventListener("change", handleChange);
		};
	}, [handleChange]);

	return (
		<div className="flex w-full items-center justify-center text-gray-500 dark:text-gray-400 gap-y-2 flex-col sm:flex-row">
			<label
				htmlFor={key}
				className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed"
			>
				<div className="flex flex-col items-center justify-center pb-6 pt-5">
					<FaCloudUploadAlt size={"4rem"} />
					<p className="mb-2 text-sm ">
						<span className="font-semibold">Click to upload</span>
						<span> or drag and drop</span>
					</p>
					<span>{accept}</span>
				</div>
				<input type="file" id={key} className="hidden" ref={fileRef} accept={accept} />
			</label>
			{state !== "rendered" && state !== "idle" && <span>{state}</span>}
			<div ref={resultRef} id="result" />
		</div>
	);
};
