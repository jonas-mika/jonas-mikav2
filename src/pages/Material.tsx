// Material.tsx
// By: Mika Senghaas
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Flex,
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
  Select,
  Input,
  Textarea,
} from "@chakra-ui/react";
import Markdown from "markdown-to-jsx";

// custom styles
import * as md from "../styles/MarkdownStyles";
import options from "../lib/markdownOptions";

// custom components
import PageBox from "../components/PageBox";
import TraceBack from "../components/TraceBack";
import EditorToggle from "../components/EditorToggle";
import httpClient from "../httpClient";
import NotFound from "../pages/NotFound";

const Material = (props: any) => {
  const { course_short, material_short } = useParams();
  const { courses, material, admin } = props.state;

  const [edit, setEdit] = useState(false);
  const [doc, setDoc] = useState({
    id: "",
    name: "",
    short_name: "",
    markdown: "",
    course_short: course_short,
  });

  useEffect(() => {
    document.title = "Teaching - Mika Senghaas";
  }, []);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    const edit_course = courses.find((c: any) => c.short_name === course_short);
    const edit_material = material.find(
      (m: any) => m.short_name === material_short && m.cid === edit_course.id
    );

    if (edit_material) {
      setDoc({
        id: edit_material.id,
        name: edit_material.name,
        short_name: edit_material.short_name,
        markdown: edit_material.markdown,
        course_short: edit_course.short_name,
      });
    }
  }, []);

  const toggleMode = () => {
    setEdit(!edit);
  };

  const setName = (e: any) => {
    setDoc((prev) => ({
      ...prev,
      name: e.target.value,
    }));
  };

  const setShortName = (e: any) => {
    setDoc((prev) => ({
      ...prev,
      short_name: e.target.value,
    }));
  };

  const setCoursename = (e: any) => {
    setDoc((prev) => ({
      ...prev,
      course_short: e.target.value,
    }));
  };

  const setMarkdown = (e: any) => {
    setDoc((prev) => ({
      ...prev,
      markdown: e.target.value,
    }));
  };

  const submit = () => {
    httpClient
      .post("/api/edit_material", doc)
      .then((res: any) => {
        props.setState((prev: any) => ({
          ...prev,
          admin: false,
          material: [...prev.material, res.data.material],
          message: res.data.msg,
        }));
      })
      .catch(() => {
        props.setState((prev: any) => ({
          ...prev,
          message: "Could not edit material. Try again later.",
        }));
      });
  };

  if (!doc.id) {
    return <NotFound />;
  } else if (admin) {
    return (
      <PageBox state={props.state}>
        <Flex justifyContent="space-between" alignItems="center" height="50px">
          <TraceBack />
          <EditorToggle edit={edit} toggleMode={toggleMode} admin={admin} />
        </Flex>
        {edit ? (
          <>
            {!doc.id ? (
              <md.H1>Add Material</md.H1>
            ) : (
              <md.H1>Edit Material</md.H1>
            )}
            <md.Divider />
            <md.P>
              Create new or edit existing material using markdown style. Use the
              input fields, switch to preview mode and hit save if you are happy
              with your changes.
            </md.P>
            <FormControl my="1rem">
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                placeholder="Name"
                value={doc.name}
                onChange={setName}
              />
            </FormControl>
            <Flex alignItems="center">
              <FormControl my="1rem">
                <FormLabel>Short Name</FormLabel>
                <Input
                  type="text"
                  placeholder="Short Name"
                  value={doc.short_name}
                  onChange={setShortName}
                />
                <FormHelperText>
                  All lowercase with dashes (used in URL)
                </FormHelperText>
              </FormControl>
              <FormControl my="1rem">
                <FormLabel>Course</FormLabel>
                <Select value={doc.course_short} onChange={setCoursename}>
                  {courses.map((course: any, i: number) => {
                    return (
                      <option key={i} value={course.short_name}>
                        {course.name}
                      </option>
                    );
                  })}
                </Select>
                <FormHelperText>Select course</FormHelperText>
              </FormControl>
            </Flex>
            <FormControl mt="1rem">
              <FormLabel>Markdown</FormLabel>
              <Textarea
                h="500px"
                placeholder="Markdown"
                value={doc.markdown}
                onChange={setMarkdown}
              />
            </FormControl>
          </>
        ) : (
          <Markdown options={options}>{doc.markdown}</Markdown>
        )}
        <Flex justifyContent="center">
          <Button
            variant="outline"
            w="100%"
            my="2rem"
            _hover={{ backgroundColor: "var(--markdown-accent)" }}
            onClick={submit}
          >
            Save
          </Button>
        </Flex>
      </PageBox>
    );
  } else {
    return (
      <PageBox>
        <Flex justifyContent="space-between" alignItems="center" height="50px">
          <TraceBack />
        </Flex>
        <Markdown options={options}>{doc.markdown}</Markdown>
      </PageBox>
    );
  }
};

export default Material;
