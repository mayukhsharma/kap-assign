import { ReactComponent as DownArrow } from "../icons/downArrow.svg";
import { ReactComponent as User } from "../icons/user.svg";

const TopNavBar = () => {
    return (
        <div class="w-screen h-1/4 my-4 mx-8">
          <div class="flex mb-2">
          <div>
          <h1 class="text-[#595959] text-xs font-semibold">Applications</h1>
          <div class="flex gap-2 items-center">
            <h1>tic-tac-toe</h1>
            <DownArrow />
          </div>
          </div>
          <div class="flex items-center gap-2 ml-auto">
            <User />
            John Doe
            <DownArrow />
          </div>
          </div>
          <div class="bg-[#F8F8F8] h-[0.75px] my-1"></div>
        </div>
    )
}

export default TopNavBar;