import SEO from '@/components/custom/utils/SEO'
import { Button } from '@/components/ui/button'
import { useProjectStore } from '@/stores/projet.store'
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { RiDashboardLine } from "react-icons/ri";
import { motion } from "framer-motion";
import { handleConfetti } from '@/functions/confetti'

const SuccessCreationProjet: React.FC = () => {
  const navigate = useNavigate();
  const { project, hasSeenSuccess, markSuccessSeen } = useProjectStore();
  const { slug } = useParams();

  // visualisations logs
  useEffect(() => {
    console.log({
      project,
      "Project Slug": project?.slug,
      "URL Slug": slug,
      hasSeenSuccess
    });
  }, [project, slug, hasSeenSuccess]);

  // Redirection avant le rendu si le projet est invalide
  if (!project || project.slug !== slug || hasSeenSuccess) {
    console.log("Redirection vers /page-not-found");
    navigate("/page-not-found", { replace: true });
  }

  // Mark page as ever seen
  useEffect(() => {
    markSuccessSeen();
  }, [markSuccessSeen]);

  // Execute confettis
  useEffect(() => {
    if (!hasSeenSuccess) {
      handleConfetti();
    }
  }, [hasSeenSuccess]);

  return (
    <>
      {/* Seo compoments */}
      <SEO
        title="Success Projet Creation - DevisMaster"
        description="You have successfully created your project on DevisMaster!"
      />

      {/* Section of validation page  */}
      <section className='relative container py-10 md:py-16 lg:py-20 flex items-center justify-center flex-col gap-4 md:gap-6 lg:gap-10'>
        {/* Animated Title */}
        <motion.h1
          className='max-w-[100%] md:max-w-[80%] lg:max-w-[70%] text-xl md:text-2xl lg:text-4xl font-bold text-center'
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <span className="text-primary">S</span>uccess <span className="text-primary">C</span>reation
        </motion.h1>

        {/* Animated Description */}
        <motion.p
          className='max-w-[100%] md:max-w-[80%] lg:max-w-[70%] text-center text-foreground/80'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .6, delay: 0.2, ease: "easeOut" }}
        >
          Congratulations! Your project "&nbsp;<span className="font-medium">{project?.name}</span>&nbsp;" has been successfully created. <br />
          What's next? Let's move forward!
        </motion.p>

        <div
          className="flex items-center gap-2 md:gap-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: .5, delay: 0.3, ease: "easeOut" }}
          >
            <Button
              className='backdrop-blur-md'
              variant={'outline'}
              onClick={() => {
                navigate('/', { replace: true });
              }}
            >
              Go Home
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: .6, delay: 0.4, ease: "easeOut" }}
          >
            <Button
              className='flex items-center gap-1 backdrop-blur-md'
              variant={'default'}
              onClick={() => {
                navigate(`/dashboard-projet/${slug}`, { replace: true });
              }}
            >
              <RiDashboardLine />
              <span>View the Dashboard</span>
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  )
}

export default SuccessCreationProjet
