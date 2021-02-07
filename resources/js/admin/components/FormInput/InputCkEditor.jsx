import React, { Fragment } from "react";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Caption from "../Caption";

export default function InputCkEditor({ item, value, setValue }) {
    let { name } = item;
    return (
        <Caption
            text={
                <span>
                    Silahkan input teks !
                    <br />
                    <h5 className="font-weight-bold"> Tips </h5>
                    Jangan lupa untuk memberikan jarak satu baris antar
                    paragraf, agar enak dibaca !
                </span>
            }
        >
            <p className="m-0 text-muted">{name}</p>
            <CKEditor
                editor={ClassicEditor}
                data={value}
                onChange={(event, editorCK) => {
                    // const data = editor.getData();
                    // console.log( { event, editor, data } );
                    setValue(editorCK.getData());
                }}
            />
        </Caption>
    );
}
