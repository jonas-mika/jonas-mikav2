// Hero.tsx
// By: Mika Senghaas
import { AspectRatio } from "@chakra-ui/react";

// components
import ThreeScene from "./ThreeScene";

const Hero = () => {
  return (
    <AspectRatio
      ratio={1}
      maxWidth="600px"
      mt={["-30px", "-90px"]}
      mb={["-80px", "-130px"]}
      ml="-40px"
      position="relative"
    >
      <ThreeScene />
    </AspectRatio>
  );
};

export default Hero;
