/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useContext } from 'react';
import { Brain, LoaderCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import {
    BtnItalic,
    BtnBold,
    BtnUnderline,
    BtnStrikeThrough,
    Separator,
    BtnNumberedList,
    BtnBulletList,
    BtnLink,
    Toolbar,
    Editor,
    EditorProvider
} from 'react-simple-wysiwyg';
import { toast } from 'sonner';
import { AIChatSession } from './../../../../service/AIModal';

const PROMPT = 'position title: {positionTitle}, Depends on position title give me 5-7 bullet points for my experience in resume (Please do not add experience level and No JSON array), give me result in HTML tags';

function RichTextEditor({ onRichTextEditorChange, index, defaultValue }) {
    const [value, setValue] = useState(defaultValue);
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const [loading, setLoading] = useState(false);

    const GenerateSummeryFromAI = async () => {
        setLoading(true);
        if (!resumeInfo.experience[index].title) {
            toast('Please Add Position Title');
            setLoading(false);
            return;
        }

        try {
            const prompt = PROMPT.replace('{positionTitle}', resumeInfo.experience[index].title);
            const result = await AIChatSession.sendMessage(prompt);
            const responseText = await result.response.text();

            const formattedResponse = responseText.replace('[', '').replace(']', '');
            setValue(formattedResponse);

            // Update the context with the new value
            const updatedExperience = resumeInfo.experience.map((item, i) => {
                if (i === index) {
                    return { ...item, summary: formattedResponse };
                }
                return item;
            });

            setResumeInfo({ ...resumeInfo, experience: updatedExperience });
            onRichTextEditorChange(formattedResponse);
        } catch (error) {
            console.error('Error generating summary:', error);
            toast('Error generating summary');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className='flex justify-between my-2'>
                <label className='text-xs'>Summary</label>

                <Button variant="outline" size="sm"
                    onClick={GenerateSummeryFromAI}
                    disabled={loading}
                    className="flex gap-2 border-primary text-primary">
                    {
                        loading ?
                            <LoaderCircle className='animate-spin' /> :
                            <>
                                <Brain className='h-4 w-4' />Generate with AI
                            </>
                    }
                </Button>
            </div>
            <EditorProvider>
                <Editor value={value} onChange={(e) => {
                    const newValue = e.target.value;
                    setValue(newValue);
                    onRichTextEditorChange(newValue);

                    // Update the context with the new value
                    const updatedExperience = resumeInfo.experience.map((item, i) => {
                        if (i === index) {
                            return { ...item, summary: newValue };
                        }
                        return item;
                    });

                    setResumeInfo({ ...resumeInfo, experience: updatedExperience });
                }}>
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
