import type { NextPage } from "next";
import Button from "../../components/button";
import Input from "../../components/input";
import Layout from "../../components/layout";
import TextArea from "../../components/textarea";
// @ts-ignore
import { Stream } from "@prisma/client";
import {useForm} from "react-hook-form";
interface CreateForm {
    name: string;
    price: string;
    description: string;
}

interface CreateResponse {
    ok: boolean;
    stream: Stream;
}

const Create: NextPage = () => {
    const { register, handleSubmit } = useForm<CreateForm>();
  return (
    <Layout canGoBack title="Go Live">
      <form className=" space-y-4 py-10 px-4">
        <Input register={register("name", { required: true })} required label="Name" name="name" type="text" />
        <Input
            register={register("price", { required: true, valueAsNumber: true })}
          required
          label="Price"
          name="price"
          type="text"
          kind="price"
        />
        <TextArea register={register("description", { required: true })} name="description" label="Description"a />
        <Button text="Go live" />
      </form>
    </Layout>
  );
};

export default Create;