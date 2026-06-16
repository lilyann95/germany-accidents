import FilterBar from "../components/filters/FilterBar";
import QuestionGrid from "../components/questions/QuestionGrid";
import AnswerPanel from "../components/answer/AnswerPanel";
import MainLayout from "../components/layout/MainLayout";

const Home = () => {
  return (
    <MainLayout>
      <FilterBar />

      <div className="main-content">
        <QuestionGrid />
        <AnswerPanel />
      </div>
    </MainLayout>
  );
};

export default Home;
