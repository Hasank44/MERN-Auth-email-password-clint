import React from "react";
import { ArrowRight, Zap, PlayCircle } from "lucide-react";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Hero = () => {
  const navigate = useNavigate();
  const { user } = useSelector(store => store.user);
  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 overflow-hidden text-gray-100">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(34,197,94,0.15),transparent_70%)] pointer-events-none"></div>
      <section className="w-full h-full flex flex-col justify-center items-center px-4 text-center relative z-10">
        <div
          className="flex flex-col items-center space-y-6"
        >
          <Badge
            variant="secondary"
            className="flex items-center gap-2 px-4 py-1 border border-green-400/40 text-green-300 bg-white/10 backdrop-blur-md"
          >
            <Zap className="w-4 h-4" />
            <span className="font-medium">New: AI-powered note organization</span>
          </Badge>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold leading-tight">
            <span className="text-green-500">Your thoughts</span>, organized and{" "}
            <span className="text-gray-300">accessible everywhere</span>
          </h1>
          <p className="max-w-2xl text-gray-400 md:text-lg leading-relaxed">
            Capture ideas, organize thoughts, and collaborate seamlessly.
            A modern note-taking app that grows with you — and keeps your
            ideas secure in the cloud.
          </p>
          <div className="flex flex-wrap gap-4 justify-center mt-4">
            <Button
              onClick={() => navigate("/create-todo")}
              size="lg"
              className="relative h-12 px-8 bg-green-600 hover:bg-green-500 text-white font-semibold rounded-full shadow-lg shadow-green-700/30 transition-transform hover:-translate-x-1"
            >
              Start Taking Notes
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="h-12 px-8 border-2 border-green-600 text-green-400 bg-transparent hover:bg-green-600/10 rounded-full font-semibold flex items-center gap-2"
            >
              <PlayCircle className="w-5 h-5" />
              Watch Demo
            </Button>
          </div>
          <p className="text-sm text-gray-400 mt-6">
            Free forever • No credit card required • Setup in under 2 minutes
          </p>
        </div>
      </section>
    </div>
  );
};

export default Hero;
