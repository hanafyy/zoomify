'use client';
import { ReactNode } from 'react';
import { Dialog, DialogContent } from './ui/dialog';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import Image from 'next/image';
import React from 'react';
interface MeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  className?: string;
  children?: ReactNode;
  handleClick?: () => void;
  buttonText?: string;
  instantMeeting?: boolean;
  image?: string;
  buttonClassName?: string;
  buttonIcon?: string;
  loading?: boolean;
}

function MeetingModal({
  isOpen,
  onClose,
  title,
  className,
  children,
  handleClick,
  buttonText,

  image,

  buttonIcon,
  loading,
}: MeetingModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="flex w-full max-w-[520px] flex-col gap-6 border-none bg-dark-1 px-6 py-9 text-white">
        <div className="flex flex-col gap-6">
          {image && (
            <div className="flex justify-center">
              <Image src={image} alt="checked" width={72} height={72} />
            </div>
          )}
          <h1 className={cn('text-3xl font-bold leading-[42px]', className)}>
            {title}
          </h1>
          {children}
          {!loading && (
            <Button
              className={
                'bg-blue-1 focus-visible:ring-0 focus-visible:ring-offset-0'
              }
              onClick={handleClick}
            >
              {buttonIcon && (
                <Image
                  src={buttonIcon}
                  alt="button icon"
                  width={13}
                  height={13}
                />
              )}
              &nbsp;
              {buttonText || 'Schedule Meeting'}
            </Button>
          )}
          {loading && (
            <div className="bg-blue-1 focus-visible:ring-0 focus-visible:ring-offset-0 w-full rounded-md flex items-center justify-center h-8">
              <Image
                src="/icons/loading-circle.svg"
                alt="loading"
                width={25}
                height={25}
              />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default MeetingModal;
