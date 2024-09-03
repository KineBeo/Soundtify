
import MobileFooter from "./MobileFooter"
export default function Footer() {
    return (
      <div>
        <div className="tablet:hidden mini-laptop:hidden laptop:hidden desktop:hidden">
            <MobileFooter />
        </div>
        <div>

        </div>
      </div>
    )
}
  