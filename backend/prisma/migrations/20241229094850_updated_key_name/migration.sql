/*
  Warnings:

  - You are about to drop the column `menuId` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `parentId` on the `Item` table. All the data in the column will be lost.
  - Added the required column `menu_id` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `parent_id` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_menuId_fkey";

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "menuId",
DROP COLUMN "parentId",
ADD COLUMN     "menu_id" TEXT NOT NULL,
ADD COLUMN     "parent_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_menu_id_fkey" FOREIGN KEY ("menu_id") REFERENCES "Menu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
