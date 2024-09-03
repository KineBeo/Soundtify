import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FaFacebook } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import Link from "next/link";
import { Divider } from "@nextui-org/react";

export default function MobileFooter() {
  return (
    <div>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Company</AccordionTrigger>
          <AccordionContent>
            <div className="text-gray-400">
              <p>About</p>
              <p className="mt-2">Jobs</p>
              <p className="mt-2">For the Record</p>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Communities</AccordionTrigger>
          <AccordionContent>
            <div className="text-gray-400">
              <p className="">For Artists</p>
              <p className="mt-2">Developers</p>
              <p className="mt-2">Advertising</p>
              <p className="mt-2">Investors</p>
              <p className="mt-2">Vendors</p>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Useful Links</AccordionTrigger>
          <AccordionContent>
            <div className="text-gray-400">
              <p>Support</p>
              <p className="mt-2">Free Mobile App</p>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>Soundtify Plans</AccordionTrigger>
          <AccordionContent>
            <div className="text-gray-400">
              <p>Spotify Free</p>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <div className="flex gap-4 items-center mt-10 text-3xl">
        <Link href={"https://www.facebook.com/"}>
          <FaFacebook />
        </Link>
        <Link href={"https://github.com/KineBeo"}>
          <FaGithub />
        </Link>
        <Link href={"https://github.com/KineBeo"}>
          <FaInstagram />
        </Link>
      </div>
      <Divider className="mt-10" />
      <div className="text-gray-400 mt-8 text-center">
        <p>
            © 2024 Soundtify. All rights reserved. Terms of Service Privacy Policy
        </p>
      </div>
    </div>
  );
}
