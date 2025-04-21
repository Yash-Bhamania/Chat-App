import React, { useState, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, X } from "lucide-react";
const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();

  const handleImageChange = (e) => {};

  const removeImage = (e) => {};

  const handleSendMessage = async (e) => {};

  return (
    <div className="p-4 w-full ">
      {imagePreview && (
        <div className=" mb-3 flex items-center gap-2 ">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Prewiew image"
              className="w-20 h-20  object-cover rounded-lg border border-zinc-700"
            />
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300 flex items-center justify-center "
              type="button"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex-1 flex  gap-2">
          <input
            type="text"
            className="w-full input input-bordered input-sm rounded-lg sm:input-md"
            placeholder="Type a message"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="hidden"
          />

          <button
            type="button"
            className={`hidden sm:flex btn btn-circle ${
              imagePreview ? "text-emerald-500" : "text-zinc-400"
            } `}
            onClick={() => fileInputRef.current.click()}
          >
            <Image size={20} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default MessageInput;
