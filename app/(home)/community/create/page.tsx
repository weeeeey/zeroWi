'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
// import { Bold, Edit3, Image as ImageIcon, Italic, Link as LinkIcon } from 'lucide-react';
import { Edit3 } from 'lucide-react';
import { useState } from 'react';

const TEXT_AREA_HEIGHT = '53vh';

export default function CommunityCreatePage() {
  const [title, setTitle] = useState<string>();
  const [content, setContent] = useState('');

  // const insertMarkdown = (syntax: string, placeholder: string = '') => {
  //   const textarea = document.querySelector('textarea') as HTMLTextAreaElement;
  //   const start = textarea.selectionStart;
  //   const end = textarea.selectionEnd;
  //   const selectedText = content.substring(start, end) || placeholder;
  //   const newText =
  //     content.substring(0, start) + syntax.replace('{}', selectedText) + content.substring(end);
  //   setContent(newText);
  // };

  return (
    <div className="container h-full space-y-4 bg-white pb-[70px]">
      <div className="flex items-center justify-between">
        <header className="flex items-center gap-2">
          <Edit3 className="size-5" />
          <div className="font-semibold">글 작성하기</div>
        </header>
        <div className="flex justify-end gap-2">
          <Button variant="outline">임시저장</Button>
          <Button className="bg-indigo-600 hover:bg-indigo-700">게시하기</Button>
        </div>
      </div>
      <section>
        {/* 글 제목 */}
        <div className="mb-2">
          <Input
            placeholder="게시글 제목"
            alt="post-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <Tabs defaultValue="write" className="w-full space-y-1">
          <TabsList className="grid h-12 w-full grid-cols-2 bg-slate-200">
            <TabsTrigger
              className="cursor-pointer data-[state=active]:bg-black data-[state=active]:text-white data-[state=active]:shadow-lg"
              value="write"
            >
              작성
            </TabsTrigger>
            <TabsTrigger
              className="cursor-pointer data-[state=active]:bg-black data-[state=active]:text-white data-[state=active]:shadow-lg"
              value="preview"
            >
              미리보기
            </TabsTrigger>
          </TabsList>

          {/* 게시글 내용 */}
          <TabsContent value="write">
            {/* 마크다운 에디터 툴바 */}
            {/* <div className="flex gap-2 rounded-lg border bg-gray-50 p-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => insertMarkdown('**{}**', '굵은 텍스트')}
              >
                <Bold className="size-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => insertMarkdown('*{}*', '기울임 텍스트')}
              >
                <Italic className="size-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => insertMarkdown('[{}](url)', '링크 텍스트')}
              >
                <LinkIcon className="size-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => insertMarkdown('![alt]({})', '이미지 URL')}
              >
                <ImageIcon className="size-4" />
              </Button>
            </div> */}

            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="게시글 작성"
              style={{
                height: TEXT_AREA_HEIGHT,
              }}
              className="font-mono"
            />
          </TabsContent>

          {/* 게시글 미리보기 */}
          <TabsContent value="preview">
            <Textarea
              value={content}
              disabled
              placeholder="작성 된 내용이 없습니다..."
              style={{
                height: TEXT_AREA_HEIGHT,
              }}
              className="font-mono disabled:opacity-100"
            />
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
}
