"use client";

import MDEditor from "@uiw/react-md-editor";

interface Props {
  value: string;
  setValue: (value: string) => void;
}

const PostNew = ({ value, setValue }: Props) => {
  return (
    <div>
      <MDEditor
        value={value}
        onChange={(val) => setValue(val || "")}
        data-color-mode="light"
      >
        <MDEditor.Markdown source={value} />
      </MDEditor>
    </div>
  );
};

export default PostNew;
