'use client';
import Link from "next/link";

import { useEffect, useRef, useState } from 'react';

export default function VideoScrollPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const [fps, setFps] = useState(30);
  const [frame, setFrame] = useState(0);
  const [lastTime, setLastTime] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    const scroller = scrollRef.current;
    if (!video || !scroller) return;

    const onMeta = async () => {
      // webkitDecodedFrameCount is undefined on iOS; fall back to default 30
      if (video.duration && typeof video.webkitDecodedFrameCount === 'number') {
        setFps(Math.round(video.webkitDecodedFrameCount / video.duration) || 30);
      }
      // 👇 kick‑start WebKit’s decoder: muted autoplay is allowed
      try {
        await video.play();
        video.pause();
      } catch (_) {/* ignore autoplay‑promise quirks */ }
      video.currentTime = 0;   // now seeks will work
    };
    video.addEventListener('loadedmetadata', onMeta, { once: true });

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const maxScroll =
          scroller.offsetHeight - window.innerHeight;
        const progress = Math.min(window.scrollY / maxScroll, 1);
        const target = progress * video.duration;

        // Only seek if we moved ≥ 1 frame
        if (Math.abs(target - lastTime) > 1 / fps) {
          video.currentTime = target;
          setLastTime(target);
          setFrame(Math.floor(target * fps));
        }
        ticking = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [fps, lastTime]);

  return (
    <main className="relative flex">
      {/* LEFT :: fixed vertical video */}
      <video
        ref={videoRef}
        src="/videos/slow-mo-3.mp4"   // place in /public/videos/
        muted
        autoPlay           /* ✅ let iOS fetch & decode immediately */
        playsInline
        preload="auto"
        className="fixed left-0 top-0 h-screen w-auto object-cover will-change-transform -z-10"
      />

      {/* RIGHT :: scrolling copy */}
      <div
        ref={scrollRef}
        className="ml-[min(50vw,500px)] min-h-[400vh] w-full bg-black px-8 py-24 text-white"
      >
        {[
  // 1 — viral origin
  <>
    The original&nbsp;
    <Link href="https://www.als.org/ibc" target="_blank">
      Ice&nbsp;Bucket&nbsp;Challenge
    </Link>
    &nbsp;erupted in summer 2014 when ALS advocate Pete Frates and friends
    invited the internet to drench themselves in ice water, donate, and tag
    others—turning the social graph itself into a fundraiser.
  </>,

  // 2 — record‑breaking funds
  <>
    In barely six weeks the movement generated 17&nbsp;million uploads and
    delivered&nbsp;$115 million to the&nbsp;
    <Link href="https://www.als.org/ibc" target="_blank">
      ALS Association
    </Link>
    , a windfall that seeded dozens of labs and even helped scientists identify
    the&nbsp;
    <Link
      href="https://time.com/4426072/ice-bucket-challenge-als-discovery/"
      target="_blank"
    >
      NEK1 gene
    </Link>
    &nbsp;linked to ALS.
  </>,

  // 3 — classroom hook
  <>
    Teachers noticed students were already obsessed with the meme, so outlets
    like&nbsp;
    <Link
      href="https://choices.scholastic.com/pages/content-hubs/decision-making/lesson-plan-are-you-following-the-herd.html"
      target="_blank"
    >
      Scholastic Choices
    </Link>
    &nbsp;framed it in “herd‑mentality” lessons, letting English and health
    classes analyze peer influence while biology classes covered neuro‑
    degeneration.
  </>,

  // 4 — early safety notes
  <>
    A handful of risky copycats prompted schools to pair any challenge with
    adult supervision and clear safety norms, a caution reflected in PBS local
    coverage of&nbsp;
    <Link
      href="https://www.pbs.org/video/njtoday-mary-alice-williams-takes-icebucketchallenge/"
      target="_blank"
    >
      student‑run buckets in 2014
    </Link>
    .
  </>,

  // 5 — spark for social‑good pedagogy
  <>
    Education writers on&nbsp;
    <Link
      href="https://www.edutopia.org/blog/empowering-student-changemakers-vicki-davis"
      target="_blank"
    >
      Edutopia
    </Link>
    &nbsp;held it up as proof that teens could become “social entrepreneurs”
    when armed with storytelling, empathy, and a clear call to action.
  </>,

  // 6 — pivot to mental‑health
  <>
    Mental‑health advocates soon wondered if the same formula could destigmatize
    anxiety and depression; by 2024&nbsp;
    <Link
      href="https://www.als.org/stories-news/new-report-highlights-progress-made-because-als-ice-bucket-challenge"
      target="_blank"
    >
      retrospectives
    </Link>
    &nbsp;on the campaign explicitly called it a blueprint for other causes.
  </>,

  // 7 — 2025 Speak Your MIND launch
  <>
    In March 2025 the University of South Carolina’s&nbsp;
    <Link
      href="https://support.activeminds.org/fundraiser/6221101"
      target="_blank"
    >
      MIND&nbsp;Club
    </Link>
    &nbsp;revived the stunt as the “Speak Your MIND Ice Bucket Challenge,”
    asking participants to share one mental‑health tip before the splash and to
    donate&nbsp;$5 to&nbsp;
    <Link href="https://www.activeminds.org/" target="_blank">
      Active Minds
    </Link>
    .
  </>,

  // 8 — local‑news amplification
  <>
    Regional outlets such as&nbsp;
    <Link
      href="https://wset.com/news/local/a-bigger-deeper-meaning-new-ice-bucket-challenge-raises-awareness-for-mental-health-active-minds-non-profit-april-2025"
      target="_blank"
    >
      WSET ABC‑13
    </Link>
    &nbsp;covered the relaunch, underscoring its “deeper meaning” for student
    wellness.
  </>,

  // 9 — high‑school adoption
  <>
    High‑schoolers quickly joined: the student newspaper&nbsp;
    <Link
      href="https://sjcsabre.org/speak-your-mind-ice-bucket-challenge-raising-awareness-about-mental-health/"
      target="_blank"
    >
      <em>The Sabre</em>
    </Link>
    &nbsp;documented sports teams nominating rivals between scrimmages to keep
    mental‑health talk front‑and‑center.
  </>,

  //10 — spirit‑week integration
  <>
    Many campuses slotted the challenge into spring spirit weeks—guidance
    counselors staffed resource booths while science teachers explained the
    physiology of cold‑shock and stress.
  </>,

  //11 — viral metrics
  <>
    On TikTok the hashtag&nbsp;
    <Link
      href="https://www.tiktok.com/discover/how-to-play-the-usc-mind-ice-bucket-challenge"
      target="_blank"
    >
      #SpeakYourMIND
    </Link>
    &nbsp;passed 200 million views in ten days, mirroring the exponential
    trajectory of the 2014 original.
  </>,

  //12 — classroom impact wrap‑up
  <>
    Today advisers treat the reboot as both fundraiser and SEL lesson,
    combining the adrenaline of a public commitment with journaling prompts,
    peer‑support sign‑ups, and clear pathways to counseling—proof that a bucket
    of ice water can open the door to serious mental‑health dialogue.
  </>,
].map((content, idx) => (
  <p key={idx} className="mx-auto mb-16 max-w-2xl text-lg leading-relaxed">
    {content}
  </p>
))}
      </div>

      {/* frame counter */}
      <div className="fixed bottom-4 right-4 rounded bg-black/70 px-3 py-2 font-mono text-sm text-white">
        Frame {frame}
      </div>
    </main>
  );
}
