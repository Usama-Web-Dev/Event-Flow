import React from "react";
import { Routes, Route } from "react-router-dom";
import { Tabs } from "antd";
import NotFound from "./NotFound";
import Dashboard from "./Pages/Dashboard";
// import Conference from "./Pages/Conference/Add";
import Add from "./Pages/Conference/Add";
import View from "./Pages/Conference/View";
import ViewSpeaker from "./Pages/Conference/ViewSpeaker";
import ViewVenue from "./Pages/Conference/ViewVenue";
import Edit from "./Pages/Conference/Edit";
// import EditSpeaker from "./Pages/Conference/EditSpeaker";
import EditSpeaker from "./Pages/Conference/EditSpeaker";
import EditVenue from "./Pages/Conference/EditVenue";
import AddSpeaker from "./Pages/Conference/AddSpeaker";
// import AddVenue from "./Pages/Conference/AddVenue";
import AddVenue from "./Pages/Conference/AddVenue";
import AddAdmin from "./Pages/Admin/AddAdmin";
import ViewAdmin from "./Pages/Admin/ViewAdmin";
import EditAdmin from "./Pages/Admin/EditAdmin";
import UpdatePassword from "./Pages/Setting/UpdatePassword";
import UpdateProfile from "./Pages/Setting/UpdateProfile";
const { TabPane } = Tabs;
function AppRouting() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      {/* <Route path="/add" element={<Conference />} />  */}
      {/* <Route path="/add" element={<Add />} /> */}
      <Route path="/add" element={
        <Tabs defaultActiveKey="1" centered size='large' type="card">
          <TabPane tab="Add Conference" key="1">
            <Add />
          </TabPane>
          <TabPane tab="Add Speaker" key="2">
            <AddSpeaker />
          </TabPane>
          <TabPane tab="Add Venue" key="3">
            <AddVenue />
          </TabPane>
        </Tabs>
      } />

      {/* <Route path="/add-speaker" element={<AddSpeaker />} />
      <Route path="/add-venue" element={<AddVenue />} /> */}
      {/* <Route path="/view" element={<View />} /> */}
      <Route path="/view" element={
        <Tabs defaultActiveKey="1" centered size='large'>
          <TabPane tab="View Conference" key="1">
            <View />
          </TabPane>
          <TabPane tab="View Speaker" key="2">
            <ViewSpeaker />
          </TabPane>
          <TabPane tab="View Venue" key="3">
            <ViewVenue />
          </TabPane>
        </Tabs>
      } />
      {/* <Route path="/view-speaker" element={<ViewSpeaker />} />
      <Route path="/view-venue" element={<ViewVenue />} /> */}
      <Route path="/edit/:id" element={<Edit />} />
      <Route path="/edit-speaker/:id" element={<EditSpeaker />} />
      <Route path="/edit-venue/:id" element={<EditVenue />} />
      <Route path="/add-admin" element={<AddAdmin />} />
      <Route path="/view-admin" element={<ViewAdmin />} />
      <Route path="/edit-admin/:id" element={<EditAdmin />} />
      <Route path="/update-password" element={<UpdatePassword />} />
      <Route path="/update-profile" element={<UpdateProfile />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRouting;
