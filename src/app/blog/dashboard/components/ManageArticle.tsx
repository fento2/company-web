import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, X } from "lucide-react";
import { useAppDispatch } from "@/lib/redux/hook";
import { setIsEditing } from "@/lib/redux/features/editArticleSlice";



interface IManageArticle {
    setShowModal: (value: boolean) => void;
    setShowConfirm: (value: boolean) => void;

}

export default function ManageArticle(props: IManageArticle) {

    const dispatch = useAppDispatch();


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs">
            <div className="relative w-[320px]">
                <Card className="p-6 shadow-2xl rounded-none bg-stone-300 border-none">
                    <h2 className="text-xl font-bold text-slate-800 text-center">Manage Article</h2>
                    <div className="border-t border-b border-black/30">

                        <Button
                            variant="ghost"
                            className="w-full flex items-center justify-start gap-2 hover:bg-stone-400 rounded-none p-6"
                            onClick={() => {
                                dispatch(setIsEditing(true))
                                props.setShowModal(false);
                            }}>
                            <Pencil className="w-5 h-5" />
                            Edit Article
                        </Button>

                        <Button
                            variant="ghost"
                            className="w-full flex items-center justify-start gap-2 hover:text-red-500 hover:bg-stone-400 rounded-none p-6"
                            onClick={() => {
                                props.setShowModal(false)
                                props.setShowConfirm(true)
                            }

                            }>
                            <Trash2 className="w-5 h-5" />
                            Delete Article
                        </Button>
                    </div>

                    <Button
                        variant="ghost"
                        className="w-full flex items-center justify-center hover:bg-stone-400 rounded-none p-6"
                        onClick={() => props.setShowModal(false)}>
                        <X className="w-4 h-4 mr-1" />
                        Cancel
                    </Button>
                </Card>
            </div>
        </div>
    );
}
