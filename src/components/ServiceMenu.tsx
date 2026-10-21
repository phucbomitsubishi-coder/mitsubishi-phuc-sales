import LinkPanelMenu from "@/components/LinkPanelMenu";
import { serviceLinks } from "@/lib/menuLinks";

// Mục "Dịch vụ" trên menu máy tính (bảo hành, bảo hành mở rộng, bảo dưỡng...; ảnh từ menu Dịch vụ MMV)
export default function ServiceMenu() {
  return <LinkPanelMenu id="dich-vu" label="Dịch vụ" image="/images/cars/menu-service.png" links={serviceLinks} activePrefixes={["/ho-tro"]} />;
}
