import LinkPanelMenu from "@/components/LinkPanelMenu";
import { buyLinks } from "@/lib/menuLinks";

// Mục "Mua xe" trên menu máy tính (bảng ảnh trái, link phải; danh sách link ở src/lib/menuLinks.ts)
export default function BuyMenu() {
  return <LinkPanelMenu id="mua-xe" label="Mua xe" image="/images/cars/menu-buy.png" links={buyLinks} activePrefixes={["/du-toan"]} />;
}
