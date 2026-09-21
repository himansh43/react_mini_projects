import Profile from "./Components/Profile";
import DashBoard from "./Components/DashBoard";
import Settings from "./Components/Settings";
import Invoice from "./Components/Invoice";



const data = [
  {
    label: "Profile",
    component:<Profile/>
  },
  {
    label: "DashBoard",
    component: <DashBoard/>
  },
  {
    label: "Settings",
    component: <Settings/>
  },
  {
    label: "Invoice",
    component: <Invoice/>
  },
];
export default data;
