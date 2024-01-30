import React from "react";

const Profile = () => {
  return (
    <div className="container mx-auto py-5 text-gray-600">
      <div className="mt-5">
        <h1 className="text-3xl">Student information</h1>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQlXn7124JmmAXGY9xAKNBZvETD8QiFKSaQg&usqp=CAU"
          className="w-[120px] h-[140px] mt-3"
          alt="Student Avatar"
        />
        <div>
          <table className="table border border-gray-300 w-full">
            <tbody>
              <tr className="border border-gray-300 flex justify-between w-full">
                <td style={{ width: "20%" }} className="basis-1/3">
                  <fieldset>
                    <legend
                      style={{ backgroundColor: "#6b90da" }}
                      className="w-full"
                    >
                      <b>Profile</b>
                    </legend>
                    <table className="table border border-gray-300">
                      <tbody>
                        <TableRow label="Full name" value="Vũ Văn Cường" />
                        <TableRow label="Date of birth" value="14/04/2003" />
                        <TableRow label="Gender" value="Male" />
                        <TableRow label="ID Card" value="022203001194" />
                        <TableRow
                          label="Address"
                          value="Khu 5, Phường Hải Yên, Thành phố Móng Cái, Quảng Ninh"
                        />
                        <TableRow
                          label="Phone number"
                          value="0989396296, 0859977380"
                        />
                        <TableRow
                          label="Email"
                          value={
                            <a href="mailto:cuongvvhe170851@fpt.edu.vn">
                              cuongvvhe170851@fpt.edu.vn
                            </a>
                          }
                        />
                        <TableRow label="Date of issue" value="27/06/2018" />
                        <TableRow
                          label="Place of issue"
                          value="Cục Cảnh sát ĐKQL cư trú và DLQG về dân cư"
                        />
                      </tbody>
                    </table>
                  </fieldset>
                </td>
                <td style={{ width: "20%" }} className="basis-1/3">
                  <fieldset>
                    <legend
                      style={{ backgroundColor: "#6b90da" }}
                      className="w-full"
                    >
                      <b>Academic</b>
                    </legend>
                    <table className="table border border-black">
                      <tbody>
                        <TableRow label="Roll number" value="HE170851" />
                        <TableRow label="Old RollNumber" value="" />
                        <TableRow
                          label="Member Code "
                          value="cuongvvhe170851
"
                        />
                        <TableRow label="Enrol date " value="" />
                        <TableRow label="Mode" value="Chính quy" />
                        <TableRow
                          label="Status "
                          value="HD - HD, Is progress"
                        />
                        <TableRow label="Current Term No" value="5" />
                        <TableRow label="Major" value="BIT" />
                        <TableRow label="Curriculum" value="BIT_SE_17C_NJ" />
                        {/* <TableRow label="Capstone project" value="" /> */}
                      </tbody>
                    </table>
                  </fieldset>
                  {/* <fieldset>
                    <legend>
                      <b>Parent</b>
                    </legend>
                    <table className="table border border-black">
                      <tbody>
                        <TableRow label="Name" value="Vũ Văn Minh" />
                        <TableRow label="Phone number" value="0982798766" />
                        <TableRow label="Address" value="" />
                        <TableRow
                          label="Email"
                          value={<a href="mailto:"></a>}
                        />
                        <TableRow label="Job" value="tự do" />
                        <TableRow label="Place of work" value="" />
                      </tbody>
                    </table>
                  </fieldset> */}
                </td>
                <td style={{ width: "20%" }} className="basis-1/3">
                  <fieldset>
                    <legend
                      style={{ backgroundColor: "#6b90da" }}
                      className="w-full"
                    >
                      <b>Parent</b>
                    </legend>
                    <table className="table border border-black">
                      <tbody>
                        <TableRow label="Name" value="Vũ Văn Minh" />
                        <TableRow label="Phone number" value="0982798766" />
                        <TableRow label="Address" value="" />
                        <TableRow
                          label="Email"
                          value={<a href="mailto:"></a>}
                        />
                        <TableRow label="Job" value="tự do" />
                        <TableRow label="Place of work" value="" />
                      </tbody>
                    </table>
                  </fieldset>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const TableRow = ({ label, value }) => (
  <tr className="border border-gray-300">
    <td className="w-1/5 text-left border border-gray-300">{label}&nbsp;</td>
    <td>
      <span>{value}</span>
    </td>
  </tr>
);

export default Profile;
