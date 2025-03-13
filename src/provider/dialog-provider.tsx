'use client';

import { create } from 'zustand';

import ProductPreviewDialog from '@/components/dialogs/product-preview-dialog';
import WillMount from '@/components/will-mount';
import { IProductWithTranslation } from '@/types/product';

export enum DialogName {
  PRODUCT_PREVIEW = 'product-preview',
  NONE = 'none',
}

interface IDialogDataProps {
  product?: IProductWithTranslation;
}

interface IDialogStoreProps {
  dialogName: DialogName;
  dialogData: IDialogDataProps;
  openDialog(dialogName: DialogName, data?: IDialogDataProps): void;
  closeDialog(): void;
}

const SHADCN_DIALOG_CLOSE_TIMEOUT = 200;

export const useDialogStore = create<IDialogStoreProps>(set => ({
  dialogName: DialogName.NONE,
  dialogData: {},
  openDialog(dialogName, data) {
    set({ dialogName, dialogData: data });
  },
  closeDialog() {
    set({ dialogName: DialogName.NONE });
    setTimeout(() => {
      set({ dialogData: {} });
    }, SHADCN_DIALOG_CLOSE_TIMEOUT);
  },
}));

export default function DialogProvider() {
  const dialogName = useDialogStore(state => state.dialogName);

  return (
    <>
      <WillMount mountOn={dialogName === DialogName.PRODUCT_PREVIEW}>
        <ProductPreviewDialog />
      </WillMount>
    </>
  );
}
