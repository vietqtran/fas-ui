import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import useFeedBack from "@/hooks/FeedBack";
import { useSelector } from "react-redux";
import { RootState } from "@/helpers/redux/reducers";
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  maxHeight: "80%",
  overflowY: "auto", // or "scroll"
  bgcolor: "#fff",
  border: "1px solid #ccc",
  p: 4,
  outline: "none",
};
interface Props {
  children?: React.ReactNode;
  open: boolean;
  handleClose: () => void;
  id: string;
  action: string;
  feedback: {
    id: "";
    createAt: "";
    endDate: "";
    grade: {
      code: "";
      id: "";
    };
    instructor: {
      id: "";
      username: "";
    };
    startDate: "";
    status: true;
    updateAt: "";
  };
}

const ModalFeedback = (props: Props) => {
  const { open, handleClose, feedback, id, action } = { ...props };
  const { user } = useSelector((state: RootState) => state.user);

  const [submit, setSubmit] = React.useState("create");

  const {
    feedbacks,
    studentId,
    setStudentId,
    assignFeedBackId,
    setAssignFeedBackId,
    fetchFeedBacks,
    getFeedBack,
    handleUpdateFeedBack,
    punctuality,
    setPunctuality,
    teachingSkill,
    setTeachingSkill,
    adequatelySyllabus,
    setAdequatelySyllabus,
    support,
    setSupport,
    responseQuestion,
    setResponseQuestion,
    teachingMethods,
    setTeachingMethods,
    dispositionStudents,
    setDispositionStudents,
    overall,
    setOverall,
    comment,
    setComment,
    setId,
    createFeedBack,
    checkFeedBack,
  } = useFeedBack();

  React.useEffect(() => {
    if (action === "view") {
      setId(feedback.id);
      setAdequatelySyllabus(feedback?.adequatelySyllabus);
      setTeachingSkill(feedback?.teachingSkill);
      setPunctuality(feedback?.punctuality);
      setSupport(feedback?.support);
      setResponseQuestion(feedback?.responseQuestion);
      setTeachingMethods(feedback?.teachingMethods);
      setDispositionStudents(feedback?.dispositionStudents);
      setOverall(feedback?.overall);
      setComment(feedback?.comment);
    }

    setAssignFeedBackId(feedback.id);
    setStudentId(user?.id);
    const fetchData = async () => {
      try {
        setAssignFeedBackId(feedback.id);
        setStudentId(user.student.id);
        const data = await checkFeedBack(feedback.id, user.student.id);

        if (data != null) {
          setId(data?.id);
          setAdequatelySyllabus(data?.adequatelySyllabus);
          setTeachingSkill(data?.teachingSkill);
          setPunctuality(data?.punctuality);
          setSupport(data?.support);
          setResponseQuestion(data?.responseQuestion);
          setTeachingMethods(data?.teachingMethods);
          setDispositionStudents(data?.dispositionStudents);
          setOverall(data?.overall);
          setComment(data?.comment);
          setStudentId(data?.student?.studentId);
          setAssignFeedBackId(data?.assignFeedBack?.assignFeedBackId);
          setSubmit("update");
        }
      } catch (error) {
        // Handle errors here
      }
    };
    fetchData();
  }, [feedback, user?.student?.id, action]);

  React.useEffect(() => {
    if (action === "create") {
      clearFormData();
    }
  }, [action]);

  const handleSubmit = async (e) => {
    createFeedBack(e);
    clearFormData();
  };

  const clearFormData = () => {
    setAdequatelySyllabus("");
    setTeachingSkill("");
    setPunctuality("");
    setSupport("");
    setResponseQuestion("");
    setTeachingMethods("");
    setDispositionStudents("");
    setOverall("");
    setComment("");
  };

  const handleUpdate = async (e) => {
    handleUpdateFeedBack(e);
  };
  const currentDate = new Date();

  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();

  const formattedDate = `${day}/${month}/${year}`;

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form>
            <div className="space-y-12">
              <div className="border-b border-gray-900/10 pb-12">
                <div className="flex justify-between">
                  <h2 className="text-2xl text-center font-semibold leading-7 text-gray-900">
                    EDIT FEEDBACK
                  </h2>
                  <button
                    className="text-gray-400 hover:text-gray-600 transition duration-200 ease-in-out"
                    onClick={handleClose}
                  >
                    <CloseIcon />
                  </button>
                </div>
                <div>
                  <div className="text-gray-900 my-3 flex justify-between">
                    <p>Techer: {feedback.instructor?.username}</p>
                    <p>Course: CSI</p>
                  </div>
                  <div className="text-gray-900 my-3 flex justify-between">
                    <p>Class: {feedback.grade?.code}</p>
                    <p>Date: {formattedDate}</p>
                  </div>
                </div>
                <div className="text-black font-semibold italic text-md">
                  <p>
                    Please fill out the form in evaluating your instructor for
                    the semester. After completion, please press the submit
                    button.{" "}
                  </p>
                  <p className="mt-3">
                    Tick the phrase, which best suits the teacher
                  </p>
                </div>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 text-black">
                  <div className="sm:col-span-3 bg-gray-200">
                    <FormControl className="p-5">
                      <FormLabel
                        id="punctuality"
                        className="font-semibold italic text-black text-center"
                      >
                        Regarding the teacher's punctuality
                      </FormLabel>
                      <RadioGroup
                        aria-labelledby="punctuality"
                        name="radio-buttons-group"
                        value={punctuality}
                        onChange={(event) => setPunctuality(event.target.value)}
                      >
                        <FormControlLabel
                          value="Always punctual"
                          control={<Radio disabled={action === "view"} />}
                          label="Always punctual"
                        />
                        <FormControlLabel
                          value="Mostly punctual"
                          control={<Radio disabled={action === "view"} />}
                          label="Mostly punctual"
                        />
                        <FormControlLabel
                          value="Rarely punctual"
                          control={<Radio disabled={action === "view"} />}
                          label="Rarely punctual"
                        />
                        <FormControlLabel
                          value="Not at all punctual"
                          control={<Radio disabled={action === "view"} />}
                          label="Not at all punctual"
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>

                  <div className="sm:col-span-3 bg-gray-200">
                    <FormControl className="p-5">
                      <FormLabel
                        id="skill"
                        className="font-semibold italic text-black"
                      >
                        Teaching skills of teacher
                      </FormLabel>
                      <RadioGroup
                        aria-labelledby="skill"
                        name="radio-buttons-group"
                        value={teachingSkill}
                        onChange={(event) =>
                          setTeachingSkill(event.target.value)
                        }
                      >
                        <FormControlLabel
                          value="Very Good"
                          control={<Radio disabled={action === "view"} />}
                          label="Very Good"
                        />
                        <FormControlLabel
                          value="Good"
                          control={<Radio disabled={action === "view"} />}
                          label="Good"
                        />
                        <FormControlLabel
                          value="Average"
                          control={<Radio disabled={action === "view"} />}
                          label="Average"
                        />
                        <FormControlLabel
                          value="Poor"
                          control={<Radio disabled={action === "view"} />}
                          label="Poor"
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>
                  <div className="sm:col-span-3 bg-gray-200">
                    <FormControl className="p-5">
                      <FormLabel
                        id="adequately"
                        className="font-semibold italic text-black"
                      >
                        The teacher adequately covers the topics required by the
                        syllabus
                      </FormLabel>
                      <RadioGroup
                        aria-labelledby="adequately"
                        name="radio-buttons-group"
                        value={adequatelySyllabus}
                        onChange={(event) =>
                          setAdequatelySyllabus(event.target.value)
                        }
                      >
                        <FormControlLabel
                          value="Fully covered"
                          control={<Radio disabled={action === "view"} />}
                          label="Fully covered"
                        />
                        <FormControlLabel
                          value="Mostly covered"
                          control={<Radio disabled={action === "view"} />}
                          label="Mostly covered"
                        />
                        <FormControlLabel
                          value="Partially covered"
                          control={<Radio disabled={action === "view"} />}
                          label="Partially covered"
                        />
                        <FormControlLabel
                          value="Not at all covered"
                          control={<Radio disabled={action === "view"} />}
                          label="Not at all covered"
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>
                  <div className="sm:col-span-3 bg-gray-200">
                    <FormControl className="p-5">
                      <FormLabel
                        id="support"
                        className="font-semibold italic text-black"
                      >
                        Support from the teacher - guidance for practical
                        exercises, answering questions out side of class
                      </FormLabel>
                      <RadioGroup
                        aria-labelledby="support"
                        name="radio-buttons-group"
                        value={support}
                        onChange={(event) => setSupport(event.target.value)}
                      >
                        <FormControlLabel
                          value="Very Good"
                          control={<Radio disabled={action === "view"} />}
                          label="Very Good"
                        />
                        <FormControlLabel
                          value="Good"
                          control={<Radio disabled={action === "view"} />}
                          label="Good"
                        />
                        <FormControlLabel
                          value="Average"
                          control={<Radio disabled={action === "view"} />}
                          label="Average"
                        />
                        <FormControlLabel
                          value="Poor"
                          control={<Radio disabled={action === "view"} />}
                          label="Poor"
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>
                  <div className="sm:col-span-3 bg-gray-200">
                    <FormControl className="p-5">
                      <FormLabel
                        id="response"
                        className="font-semibold italic text-black"
                      >
                        Teacher's response to student's questions in class
                      </FormLabel>
                      <RadioGroup
                        aria-labelledby="response"
                        name="radio-buttons-group"
                        value={responseQuestion}
                        onChange={(event) =>
                          setResponseQuestion(event.target.value)
                        }
                      >
                        <FormControlLabel
                          value="Answered immediately or just after the session"
                          control={<Radio disabled={action === "view"} />}
                          label="Answered immediately or just after the session"
                        />
                        <FormControlLabel
                          value="Answered in the next session"
                          control={<Radio disabled={action === "view"} />}
                          label="Answered in the next session"
                        />
                        <FormControlLabel
                          value="Some queries left unanswered"
                          control={<Radio disabled={action === "view"} />}
                          label="Some queries left unanswered"
                        />
                        <FormControlLabel
                          value="Most queries left unanswered"
                          control={<Radio disabled={action === "view"} />}
                          label="Most queries left unanswered"
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>
                  <div className="sm:col-span-3 bg-gray-200">
                    <FormControl className="p-5">
                      <FormLabel
                        id="methods"
                        className="font-semibold italic text-black"
                      >
                        Teacher has organized the lesson conducive for easy
                        understanding of students
                      </FormLabel>
                      <RadioGroup
                        aria-labelledby="methods"
                        name="radio-buttons-group"
                        value={teachingMethods}
                        onChange={(event) =>
                          setTeachingMethods(event.target.value)
                        }
                      >
                        <FormControlLabel
                          value="Always organized the lesson conducive"
                          control={<Radio disabled={action === "view"} />}
                          label="Always organized the lesson conducive"
                        />
                        <FormControlLabel
                          value="Mostly organized the lesson conducive"
                          control={<Radio disabled={action === "view"} />}
                          label="Mostly organized the lesson conducive"
                        />
                        <FormControlLabel
                          value="Rarely organized the lesson conducive"
                          control={<Radio disabled={action === "view"} />}
                          label="Rarely organized the lesson conducive"
                        />
                        <FormControlLabel
                          value="Never organized the lesson conducive"
                          control={<Radio disabled={action === "view"} />}
                          label="Never organized the lesson conducive"
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>
                  <div className="sm:col-span-3 bg-gray-200">
                    <FormControl className="p-5">
                      <FormLabel
                        id="disposion"
                        className="font-semibold italic text-black"
                      >
                        Teacher understands the weakness of a student and helps
                        in the student's improvement
                      </FormLabel>
                      <RadioGroup
                        aria-labelledby="disposion"
                        name="radio-buttons-group"
                        value={dispositionStudents}
                        onChange={(event) =>
                          setDispositionStudents(event.target.value)
                        }
                      >
                        <FormControlLabel
                          value="Always helps in the student's improvement"
                          control={<Radio disabled={action === "view"} />}
                          label="Always helps in the student's improvement"
                        />
                        <FormControlLabel
                          value="Mostly helps in the student's improvement"
                          control={<Radio disabled={action === "view"} />}
                          label="Mostly helps in the student's improvement"
                        />
                        <FormControlLabel
                          value="Rarely helps in the student's improvement"
                          control={<Radio disabled={action === "view"} />}
                          label="Rarely helps in the student's improvement"
                        />
                        <FormControlLabel
                          value="Never helps in the student's improvement"
                          control={<Radio disabled={action === "view"} />}
                          label="Never helps in the student's improvement"
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>
                  <div className="sm:col-span-3 bg-gray-200">
                    <FormControl className="p-5">
                      <FormLabel
                        id="over"
                        className="font-semibold italic text-black"
                      >
                        Over All
                      </FormLabel>
                      <RadioGroup
                        aria-labelledby="over"
                        name="radio-buttons-group"
                        value={overall}
                        onChange={(event) => setOverall(event.target.value)}
                      >
                        <FormControlLabel
                          value="Excellent insructor"
                          control={<Radio disabled={action === "view"} />}
                          label="Excellent insructor"
                        />
                        <FormControlLabel
                          value="Good insructor"
                          control={<Radio disabled={action === "view"} />}
                          label="Good insructor"
                        />
                        <FormControlLabel
                          value="Average insructor"
                          control={<Radio disabled={action === "view"} />}
                          label="Average insructor"
                        />
                        <FormControlLabel
                          value="Poor insructor"
                          control={<Radio disabled={action === "view"} />}
                          label="Poor insructor"
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>

                  <div className="sm:col-span-6">
                    <FormControl fullWidth>
                      <label
                        htmlFor="your-feedback"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Your FeedBack:
                      </label>
                      <TextField
                        size="small"
                        rows={4}
                        multiline
                        className="mt-2"
                        type="text"
                        variant="outlined"
                        value={comment}
                        disabled={action === "view"}
                        onChange={(e) => setComment(e.target.value)}
                      />
                    </FormControl>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                onClick={handleClose}
                type="button"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Cancel
              </button>
              {action != "view" && (
                <button
                  type="button"
                  onClick={submit === "create" ? handleSubmit : handleUpdate}
                  className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Save
                </button>
              )}
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalFeedback;
