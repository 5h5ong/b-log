import React from "react";
import StyledLink from "./StyledLink";
import tw from "twin.macro";
import { GapHorizontality } from "../styles/gaps";
import Tag from "./Tag";

const StyledH1 = tw.h1`m-0 mb-3`;
const StyledP1 = tw.span`m-0`;

/**
 * 포스트의 타이틀, 날짜를 표시함. 클릭 시 해당 포스트로 이동함.
 */
const PostPreview = ({ title, date, tags, to }) => {
  return (
    <StyledLink to={to}>
      <StyledH1>{title}</StyledH1>
      <>
        <GapHorizontality>
          <StyledP1>{date}</StyledP1>
        </GapHorizontality>
        {tags?.length > 0 &&
          tags.map((tag) => (
            <GapHorizontality>
              <Tag name={tag} />
            </GapHorizontality>
          ))}
      </>
    </StyledLink>
  );
};

export default PostPreview;
