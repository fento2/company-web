"use client";

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ConfirmDeleteModalProps {
    setShowConfirm: (value: boolean) => void;
    BtDeleteArticle: ()=> void;
}

export default function ConfirmDelete({ setShowConfirm, BtDeleteArticle }: ConfirmDeleteModalProps) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-xs">
            <Card className="w-[90%] max-w-sm bg-stone-300 rounded-none shadow-lg border-none">
                <CardHeader>
                    <h3 className="text-xl font-semibold text-slate-800">Confirm Deletion</h3>
                    <p className="text-sm text-slate-500">Are you sure you want to delete this article?</p>
                </CardHeader>

                <CardContent className="mt-2" />

                <CardFooter className="flex justify-end gap-4">
                    <Button
                        variant="ghost"
                        onClick={() => setShowConfirm(false)}
                        className="rounded-none border border-stone-400 hover:bg-stone-400"
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="ghost"
                        onClick={() => {setShowConfirm(false)
                        BtDeleteArticle()      
                        }}
                        className="rounded-none bg-red-500 text-white hover:bg-red-600 border border-stone-400"
                    >
                        Yes, Delete
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
