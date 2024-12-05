'use client';
import Image from 'next/image';
import React from 'react';
interface MeetingTypeBox {
  bgColor: string;
  imgUrl: string;
  title: string;
  description: string;
  handleClick?: () => void;
}
export default function MeetingTypeBox({
  bgColor,
  imgUrl,
  title,
  description,
  handleClick,
}: MeetingTypeBox) {
  return (
    <div
      onClick={handleClick}
      className={`${bgColor} duration-500
      } size-full px-4 py-6 flex flex-col justify-between xl:max-w-[270px] min-h-[260px] rounded-[14px] cursor-pointer`}
    >
      <div className="flex items-center justify-center bg-white/20 rounded-[10px] size-12">
        <Image alt="meeting icon" src={imgUrl} width={27} height={27} />
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="text-2xl font-bold">{title}</h3>
        <p className="text-lg font-normal">{description}</p>
      </div>
    </div>
  );
}
