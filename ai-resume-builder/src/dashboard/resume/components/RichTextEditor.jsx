import { Button } from '@/components/ui/button';
import { ResumeInfoContext } from '@/context/ResumeInfoProvider';
import { Brain } from 'lucide-react';
import React, { useContext, useState } from 'react';
import { AIChatSession } from '../../../../service/AIModel';

import { 
    BtnBold,
    BtnBulletList,
    BtnItalic,
    BtnLink,
    BtnNumberedList,
    BtnStrikeThrough,
    BtnUnderline,
    Editor,
    EditorProvider,
    Separator,
    Toolbar
} from 'react-simple-wysiwyg';
import { toast } from 'sonner';

function RichTextEditor({ onRichTextEditorChange, index }) {
    const [value, setValue] = useState();
    const { resumeInfo } = useContext(ResumeInfoContext);
    const [loading, setLoading] = useState(false);

    return (
        <div>
            <div className='flex justify-between my-2'>
                <label className='text-xs'>Summary</label>

            </div>
            <EditorProvider>
                <Editor 
                    value={value} 
                    onChange={(e) => {
                        setValue(e.target.value);
                        onRichTextEditorChange(e);
                    }}
                >
                    <Toolbar>
                        <BtnBold />
                        <BtnItalic />
                        <BtnUnderline />
                        <BtnStrikeThrough />
                        <Separator />
                        <BtnNumberedList />
                        <BtnBulletList />
                        <Separator />
                        <BtnLink />
                    </Toolbar>
                </Editor>
            </EditorProvider>
        </div>
    );
}

export default RichTextEditor;
