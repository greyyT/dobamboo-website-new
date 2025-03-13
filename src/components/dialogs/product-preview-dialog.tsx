'use client';

import React, { FC } from 'react';

import { Link } from '@/i18n/navigation';
import { DialogName, useDialogStore } from '@/provider/dialog-provider';

import ProductCarousel from '../product-carousel';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';

const ProductPreviewDialog: FC = () => {
  const { dialogData, dialogName, closeDialog } = useDialogStore();

  if (!dialogData.product) return null;

  const { product } = dialogData;

  return (
    <Dialog open={dialogName === DialogName.PRODUCT_PREVIEW} onOpenChange={closeDialog}>
      <DialogContent className="lg:max-w-4xl top-[35%]">
        <DialogHeader className="block lg:hidden">
          <DialogTitle>{product.translations[0].name}</DialogTitle>
          <DialogDescription>SKU: {product.SKU}</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col lg:flex-row w-full gap-6 p-6 mt-5">
          <ProductCarousel images={product.images} name={product.translations[0].name} size="md" />
          <div className="flex-1">
            <h1
              className="text-paragraph text-2xl leading-[1.2] font-bold hidden lg:block"
              aria-label="Product Name Header"
            >
              {product.translations[0].name}
            </h1>
            <Link
              href={`/${product.slug}`}
              onClick={closeDialog}
              className="block text-sm mt-1 text-subtitle"
              aria-label="Product Link"
            >
              View full details
            </Link>
            <p className="mt-4 text-sm text-subtitle">SKU: {product.SKU}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductPreviewDialog;
