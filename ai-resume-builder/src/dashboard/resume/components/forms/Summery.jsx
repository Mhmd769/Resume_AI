import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import React, { useContext, useEffect, useState } from "react";
import { ResumeInfoContext } from "@/context/ResumeInfoProvider"; // Ensure the import path is correct
import { useParams } from "react-router-dom";
import { Brain, LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import GlobalApi from "../../../../../service/GlobalApi";
import { AIChatSession } from "../../../../../service/AIModel";

const prompt =
  "job Title: {jobTitle}, Depends on job title give me a summary for my resume within 4-5 lines in JSON format with fields experience Level and Summary with Experience level for Fresher, Mid-Level, Experienced";

function Summery() {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [summary, setSummary] = useState(resumeInfo?.summary || "");
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const [aiGeneratedSummaryList, setAiGeneratedSummaryList] = useState([]);

  useEffect(() => {
    setResumeInfo((prevResumeInfo) => ({
      ...prevResumeInfo,
      summary: summary,
    }));
  }, [summary, setResumeInfo]);

  const GenerateSummaryFromAI = async () => {
    setLoading(true);
    const PROMPT = prompt.replace("{jobTitle}", resumeInfo?.jobTitle || "");
  
    try {
      const result = await AIChatSession.sendMessage(PROMPT);
      const responseText = await result.response.text();
      console.log("AI Response Text:", responseText);
  
      // Try to parse the JSON response
      let parsedResponse;
      try {
        // Fixing the response format by wrapping it into an array
        const formattedResponseText = `[${responseText}]`;
        parsedResponse = JSON.parse(formattedResponseText);
      } catch (parseError) {
        console.error("Error parsing JSON response:", parseError);
        toast("Failed to parse AI response. Please try again.");
        setLoading(false);
        return;
      }
  
      console.log("Parsed Response:", parsedResponse);
  
      // Assuming the response is now an array of objects
      if (Array.isArray(parsedResponse)) {
        setAiGeneratedSummaryList(parsedResponse);
      } else {
        console.error("Unexpected response format:", parsedResponse);
        toast("Unexpected response format from AI. Please try again.");
      }
    } catch (error) {
      console.error("Error fetching summary from AI:", error);
      toast("Failed to generate summary from AI. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  

  const onSave = (e) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      data: {
        summary: summary,
      },
    };

    console.log("Data to be sent:", data);

    GlobalApi.UpdateResumeDetials(params?.resumeId, data)
      .then((resp) => {
        console.log("API Response:", resp);
        setLoading(false);
        toast("Details updated.");
      })
      .catch((error) => {
        console.error("Error updating resume:", error);
        setLoading(false);
        toast("Failed to update details. Please try again.");
      });
  };

  return (
    <div className="p-5 shadow-lg rounded-lg border-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Summary Details</h2>
      <p>Add Summary for your job title</p>

      <form className="mt-7" onSubmit={onSave}>
        <div className="flex justify-between items-end">
          <label>Add Summary</label>
          <Button
            variant="outline"
            onClick={GenerateSummaryFromAI}
            type="button"
            size="sm"
            className="border-primary text-primary flex gap-2"
          >
            <Brain className="h-4 w-4" /> Generate From AI
          </Button>
        </div>
        <Textarea
          className="mt-5"
          required
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />
        <div className="mt-2 flex justify-end">
          <Button type="submit" disabled={loading}>
            {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
          </Button>
        </div>
      </form>

      {aiGeneratedSummaryList.length > 0 && (
        <div className="mt-7">
          <h2 className="font-bold text-lg">Suggestions</h2>
          {aiGeneratedSummaryList.map((item, index) => (
            <div key={index} className="mt-3">
              <h3 className="font-bold my-1">Level: {item.experienceLevel}</h3>
              <p>{item.summary}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Summery;
